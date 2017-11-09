function getTagFromDescriptionContent() { 
  var metas = document.getElementsByTagName('meta'); 

  for (var i=0; i<metas.length; i++) { 
     if (metas[i].getAttribute("name") == "description") { 
        return metas[i].getAttribute("content"); 
     } 
  } 

   return "";
} 

var xhr = new XMLHttpRequest();
var metatag = getTagFromDescriptionContent();
xhr.open("GET", "https://res.cloudinary.com/dkdpqgjhi/image/list/" + metatag + ".json", true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
		var json = JSON.parse(xhr.responseText);
		
		for (var i=0; i<json.resources.length; i++) {
			var resource = json.resources[i];
			var url = "https://res.cloudinary.com/dkdpqgjhi/image/upload/c_scale,w_" + resource.width + ",h_" + resource.height + "/v" + resource.version + "/" + resource.public_id + "." + resource.format;
			var elem = document.createElement("img");
			elem.src = url;
      document.getElementById("placehere").appendChild(elem);
      // document.body.appendChild(elem);
		}
			  
	  
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = function (e) {
  console.error(xhr.statusText);
};
xhr.send(null);