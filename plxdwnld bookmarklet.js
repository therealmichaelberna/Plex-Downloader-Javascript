var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/**
 * Download original files from the Plex web interface
 *
 * This project is licensed under the terms of the MIT license, see https://piplongrun.github.io/plxdwnld/LICENSE.txt
 *
 * @author      Pip Longrun <pip.longrun@protonmail.com>
 * @version     0.3
 * @see         https://piplongrun.github.io/plxdwnld/
 *
 */
"use strict";

if (typeof plxDwnld === "undefined") {

    window.plxDwnld = (function() {

        const self = {};
        const clientIdRegex = new RegExp("server\/([a-f0-9]{40})\/");
        const metadataIdRegex = new RegExp("key=%2Flibrary%2Fmetadata%2F(\\d+)");
        const apiResourceUrl = "https://web.archive.org/web/20210519002010/https://plex.tv/api/resources?includeHttps=1&X-Plex-Token={token}";
        const apiLibraryUrl = "{baseuri}/library/metadata/{id}?X-Plex-Token={token}";
        const downloadUrl = "{baseuri}{partkey}?download=1&X-Plex-Token={token}";
        const accessTokenXpath = "//web.archive.org/web/20210519002010/https://device[@clientIdentifier='{clientid}']/@accessToken";
        const baseUriXpath = "//web.archive.org/web/20210519002010/https://device[@clientIdentifier='{clientid}']/Connection[@local='0']/@uri";
        const partKeyXpath = "//web.archive.org/web/20210519002010/https://media/Part[1]/@key";
        let accessToken = null;
        let baseUri = null;

        const getXml = function(url, callback) {
            const request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    callback(request.responseXML);
                }
            };
            request.open("GET", url);
            request.send();
        };

        const getMetadata = function(xml) {
            const clientId = clientIdRegex.exec(window.location.href);

            if (clientId && clientId.length == 2) {
                const accessTokenNode = xml.evaluate(accessTokenXpath.replace('{clientid}', clientId[1]), xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                const baseUriNode = xml.evaluate(baseUriXpath.replace('{clientid}', clientId[1]), xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

                if (accessTokenNode.singleNodeValue && baseUriNode.singleNodeValue) {
                    accessToken = accessTokenNode.singleNodeValue.textContent;
                    baseUri = baseUriNode.singleNodeValue.textContent;
                    const metadataId = metadataIdRegex.exec(window.location.href);

                    if (metadataId && metadataId.length == 2) {
                        getXml(apiLibraryUrl.replace('{baseuri}', baseUri).replace('{id}', metadataId[1]).replace('{token}', accessToken), getDownloadUrl);
                    } else {
                        alert("You are currently not viewing a media item.");
                    }
                } else {
                    alert("Cannot find a valid accessToken.");
                }
            } else {
                alert("You are currently not viewing a media item.");
            }
        };

        const getDownloadUrl = function(xml) {
            const partKeyNode = xml.evaluate(partKeyXpath, xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

            if (partKeyNode.singleNodeValue) {
                window.location.href = downloadUrl.replace('{baseuri}', baseUri).replace('{partkey}', partKeyNode.singleNodeValue.textContent).replace('{token}', accessToken);
            } else {
                alert("You are currently not viewing a media item.");
            }
        };

        self.init = function() {
            if (typeof localStorage.myPlexAccessToken != "undefined") {
                getXml(apiResourceUrl.replace('{token}', localStorage.myPlexAccessToken), getMetadata);
            } else {
                alert("You are currently not browsing or logged into a Plex web environment.");
            }
        };

        return self;
    })();
}

plxDwnld.init();


}
/*
     FILE ARCHIVED ON 00:20:10 May 19, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 22:30:08 Aug 29, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 95.09
  exclusion.robots: 0.077
  exclusion.robots.policy: 0.07
  RedisCDXSource: 1.763
  esindex: 0.006
  LoadShardBlock: 75.696 (3)
  PetaboxLoader3.datanode: 83.78 (5)
  CDXLines.iter: 15.108 (3)
  load_resource: 117.619
  PetaboxLoader3.resolve: 30.994
  loaddict: 63.597
*/