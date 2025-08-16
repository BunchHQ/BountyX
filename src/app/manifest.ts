import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BountyX",
    short_name: "BountyX",
    description: "Earn. Help. Deliver. Repeat.",
    id: "org.bunchhq.bountyx",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#4e443a",
    theme_color: "#332c21",
    dir: "auto",
    lang: "en-US",
    screenshots: [
      {
        src: "/android_login.png",
        form_factor: "narrow",
        label: "Mobile Login",
        platform: "android",
        sizes: "1290x2796",
      },
      {
        src: "/android_signup.png",
        form_factor: "narrow",
        label: "Mobile Signup",
        platform: "android",
        sizes: "1290x2796",
      },
      {
        src: "/desktop_login.png",
        form_factor: "wide",
        label: "Desktop Login",
        platform: "windows",
        sizes: "3840x2160",
      },
      {
        src: "/desktop_signup.png",
        form_factor: "wide",
        label: "Desktop Signup",
        platform: "windows",
        sizes: "3840x2160",
      },
    ],
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      { purpose: "maskable", sizes: "512x512", src: "/icon512_maskable.png", type: "image/png" },
      { purpose: "any", sizes: "512x512", src: "/icon512_rounded.png", type: "image/png" },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
