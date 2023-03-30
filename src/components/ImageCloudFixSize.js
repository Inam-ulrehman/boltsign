import { Cloudinary } from '@cloudinary/url-gen'
// import { AdvancedImage, lazyload } from '@cloudinary/react'
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'

const ImageCloudFixSize = ({ width, height, src }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'boltsign',
    },
  })
  const myImage = cld.image(src)
  myImage.resize(fill().width(width).height(height))

  return (
    <div>
      <AdvancedImage
        cldImg={myImage}
        // plugins={[lazyload(), placeholder({ mode: 'predominant-color' })]}
        plugins={[lazyload()]}
      />
    </div>
  )
}
export const ImageCloudLoad = ({ width, height, src }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'boltsign',
    },
  })
  const myImage = cld.image(src)
  myImage.resize(fill().width(width).height(height))

  return (
    <div>
      <AdvancedImage
        cldImg={myImage}
        plugins={[lazyload(), placeholder({ mode: 'predominant-color' })]}
        // plugins={[lazyload()]}
      />
    </div>
  )
}

export default ImageCloudFixSize
