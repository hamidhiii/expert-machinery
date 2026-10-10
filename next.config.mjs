/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Admin uploads (products, hero slides, industries, equipment types).
      { protocol: "https", hostname: "api.expertmachinery.kz", pathname: "/media/**" },
      { protocol: "https", hostname: "www.aokman-gearbox.com", pathname: "/d/pic/**" },
      { protocol: "https", hostname: "product.standartpompa.com", pathname: "/AppRepo/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "www.yilmazuk.co.uk", pathname: "/upload/products/**" },
    ],
  },
};

export default nextConfig;
