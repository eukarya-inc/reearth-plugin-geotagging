<!-- TODO: Handle icon size -->

const html = `
<script src="https://cdn.jsdelivr.net/npm/exif-js"></script>
<script>
  let reearth, property, layers;

  function handleFileSelectFromURL(url) {
    return new Promise((resolve, reject) => {
      // Fetch the image data and convert it to a Blob
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          // Get the image metadata using Exif.js
          EXIF.getData(blob, function () {
            const exifData = EXIF.getAllTags(this);
            // Extract the latitude and longitude from the metadata
            const lat = exifData?.GPSLatitude && (exifData.GPSLatitude[0] + exifData.GPSLatitude[1] / 60 + exifData.GPSLatitude[2] / 3600);
            const lng = exifData?.GPSLongitude && (exifData.GPSLongitude[0] + exifData.GPSLongitude[1] / 60 + exifData.GPSLongitude[2] / 3600);
            if (lat && lng) {
              resolve([lat, lng]);
            } else {
              alert("Could not find GPS metadata in image!");
              reject(new Error("Could not find GPS metadata in image."));
            }
          });
        })
        .catch(error => {
          console.error("Error occurred while fetching image from URL:", url, error);
          reject(error);
        });
    });
  }

  async function getLatLong(url) {
    try {
      const [lat, lng] = await handleFileSelectFromURL(url);
      return [lat, lng];
    } catch (error) {
      console.error("Error occurred while getting lat/long for image:", url, error);
      return [undefined, undefined];
    }
  }

  //handle image list from right side panel
  async function handleImageList(images) {
    if (!images || 0 === images.length) return;
    for (const image of images) {
      const layerMatch = layers.find(layer => layer.title === image.id);

      if (image.image_url) {
        const [lat, lng] = await getLatLong(image.image_url)

        if (!lat || !lng && layerMatch) {
          reearth.layers.hide(layerMatch.id)
        }

        let option;

        if (image.imageSize && image.imageSize !== undefined) {
          option = {
            camera: {
              altitude: image?.camera?.altitude,
              fov: image?.camera?.fov,
              heading: image?.camera?.heading,
              height: image?.camera?.height,
              lat: image?.camera?.lat,
              lng: image?.camera?.lng,
              pitch: image?.camera?.pitch,
              roll: image?.camera?.roll,
            },
            height: image.height,
            image: image.image_url || "",
            imageShadow: image.imageShadow,
            imageShadowBlur: image.imageShadowBlur || 3,
            imageShadowColor: image?.imageShadowColor,
            imageShadowPositionX: image.imageShadowPositionX || 0,
            imageShadowPositionY: image.imageShadowPositionY || 0,
            imageSize: image.imageSize,
            imageCrop: image.imageCrop || "none",
            heightReference: image.heightReference,
            imageHorizontalOrigin: "center",
            imageShadow: image.imageShadow || false,
            location: {
              lat: lat,
              lng: lng,
            },
            photoOverlayDescription: image?.photoOverlayDescription,
            photoOverlayImage: image.image_url || "",
          }
        } else {
          option = {
            camera: {
              altitude: image?.camera?.altitude,
              fov: image?.camera?.fov,
              heading: image?.camera?.heading,
              height: image?.camera?.height,
              lat: image?.camera?.lat,
              lng: image?.camera?.lng,
              pitch: image?.camera?.pitch,
              roll: image?.camera?.roll,
            },
            height: image.height,
            image: image.image_url || "",
            imageShadow: image.imageShadow,
            imageShadowBlur: image.imageShadowBlur || 3,
            imageShadowColor: image?.imageShadowColor,
            imageShadowPositionX: image.imageShadowPositionX || 0,
            imageShadowPositionY: image.imageShadowPositionY || 0,
            imageCrop: image.imageCrop || "none",
            heightReference: image.heightReference,
            imageHorizontalOrigin: "center",
            imageShadow: image.imageShadow || false,
            location: {
              lat: lat,
              lng: lng,
            },
            photoOverlayDescription: image?.photoOverlayDescription,
            photoOverlayImage: image.image_url || "",
          }
        }

        if (layerMatch && lat && lng) {
          reearth.layers.show(layerMatch.id)

          //overwrite layer with img url
          reearth.layers.overrideProperty(layerMatch.id, {
            default: option,
          });
        } else if (!layerMatch && lat && lng) {

          // add new layer
          reearth.layers.add({
            title: image.id,
            extensionId: "photooverlay",
            isVisible: true,
            property: {
              default: option,
            },
          })
        }
      } else {

        if (layerMatch) {

          // override property to img url null, none, ""
          // reearth.layers.overrideProperty(layerMatch.id, {
          //   default: {
          //     image: null,
          //   }
          // })
          // => override property cant override image "" properly so hide image

          //update1505: if img url is null, hide the layer
          reearth.layers.hide(layerMatch.id)
        }
      }
    }
  }


  function hideLayers(list) {
    if (!list || 0 === list.length) {
      let filteredLayers = layers.filter(layer => layer.type === "photooverlay")
      filteredLayers.forEach(layer => {
        reearth.layers.hide(layer.id)
      });
    } else {
      const list_id = list.map(obj => obj.id);
      //layers => layer.title !== list_id then do something
      let filteredLayers = layers.filter(layer => !list_id.includes(layer.title) && layer.type === "photooverlay");
      filteredLayers.forEach(layer => {
        reearth.layers.hide(layer.id)
      });
    }

  }

  parent.postMessage({ action: "initWidget", }, "*");
  window.addEventListener("message", async function (e) {
    if (e.source !== parent) return
    reearth = e.source.reearth
    layers = reearth.layers.layers

    if (e.data.handle) {
      property = e.data.property
      imgList = property?.image_list

      hideLayers(imgList);
      handleImageList(imgList);
    }
  });

</script>
`;

const handles = {};

handles.initWidget = () => {
reearth.ui.postMessage({
handle: "initWidget",
title: "initWidget",
property: reearth.widget.property,
});
};

reearth.on("update", () => {
reearth.ui.postMessage({
handle: "handleWidget",
property: reearth.widget.property,
});
});

reearth.on("message", (msg) => {
if (msg && msg.action) {
handles[msg.action]?.(msg.payload);
}
});

reearth.ui.show(html, { width: 44, height: 44});