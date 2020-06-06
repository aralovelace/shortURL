<?php

namespace App\Http\Controllers;

use App\LastShortCode;
use App\PublicUrl;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class PublicUrlsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $urls = PublicUrl::query()->orderBy('id', 'DESC')->offset(0)->limit(10)->get();
            return response()->json(['data' => $urls, 'success' => true]);
        }catch (ModelNotFoundException $exception) {
            return response()->json(['success' => false, 'error' => $exception->getMessage()]);

        }
    }


    /**
     * Store a newly created public URL in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function store(Request $request)
    {
        $shortCode="";
        $shortCodeArr = [];
        $validator = Validator::make($request->all(), [
            'long_url' => 'required|string|url',
            'short_code' => 'max:140'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => $validator->messages()->first()]);
        }

        if ($request->short_code != '') {
            $shortCode = strtolower($request->short_code);
        } else {
            $shortCodeArr = $this->getShortCode();
            $shortCode = $shortCodeArr[1];
        }
        if ($shortCode != ""){
            try {
                $url = PublicUrl::query()->create([
                    'long_url' => $request->long_url,
                    'short_code' => $shortCode,
                    'private' => $request->private
                ]);

                if (!empty($shortCodeArr)) {
                    LastShortCode::first()->update(['last_short_code_id' => $shortCodeArr[0]]);
                }

                return response()->json(['data' => $url, 'success' => true]);
            } catch (ModelNotFoundException $exception) {
                return response()->json(['success' => false, 'error' => $exception->getMessage()]);
            }
        } else {
            return response()->json(['success' => false, 'error' => 'Cannot access text file']);
        }
    }


    /**
     * Get ShortCode from the storage/wordlist/eff_short_wordlist_2_0.txt
     * @return mixed
     */
    public function getShortCode()
    {
        $urlCodeToUseArr = [];
        try {
            $shortcodesContents = File::get(storage_path('wordlist/eff_short_wordlist_2_0.txt'));
            $lastCode = LastShortCode::first();

            /** If LastShortCode is empty then we need to add one
             * return the first shortcode from the txt file that doesnt exist in the PublicURL yet
             * Insert the last short code id in the database
             */
            if ($lastCode==null) {
                $codesRow = explode(PHP_EOL,$shortcodesContents);
                foreach ($codesRow as $firstCode) {
                    $urlCodeToUseArr =  explode(chr(9),$firstCode);
                    if (!$this->isCodeUsed($urlCodeToUseArr[1])) {
                        break;
                    }
                }
                if (!empty($urlCodeToUseArr)) {
                    LastShortCode::query()->create(['last_short_code_id' => $urlCodeToUseArr[0] ]);
                    return $urlCodeToUseArr;
                }

            /** If LastShortCode is not empty then get the last short code id
             * search the next Short Code via short code ID
             * make sure the short code doesnt exist yet in the Public URL table
             * if not exist, return the new shortcode
             */
            } else {
                $lastCodeId = $lastCode->last_short_code_id;
                while (empty($urlCodeToUseArr)) {
                    $lastCodeId++;
                    $pattern = preg_quote($lastCodeId, '/');
                    $pattern = "/^.*$pattern.*\$/m";
                    if (preg_match_all($pattern, $shortcodesContents, $matches)) {
                        $urlCodeToUse = implode("", $matches[0]);
                        $urlCodeToUseArr =  explode(chr(9),$urlCodeToUse);
                        if (!$this->isCodeUsed($urlCodeToUseArr[1])) {
                            return $urlCodeToUseArr;
                        } else {
                            $urlCodeToUseArr = [];
                        }
                    }
                }
                /* if no shortcode then ask user to enter short URL */
                return response()->json(['success' => false, 'error' => 'System Issue, Please enter Short URL']);
            }

        }catch (ModelNotFoundException $exception) {
            return response()->json(['success' => false, 'error' => "Txt File Reading Issue: ".$exception->getMessage()]);
        }
        return "";
    }

    /**
     * Check if Shortcode already used
     * @param string
     * @return bool
     */
    private function isCodeUsed($code){
        $codeIfUsed = PublicUrl::query()->where(['short_code' => $code])->first();
        return ($codeIfUsed!=null);

    }

    /**
     * Redirect ShortURL to it's Long URL
     * @param string
     * @return mixed
     */
    public function redirect($code) {

        $url = PublicUrl::query()->where(['short_code' => $code])->first();
        if ( $url!=null) {
            $url->increment('number_visit');
            return redirect()->away($url->long_url);
        } else {
            abort(404);
        }

    }








}
