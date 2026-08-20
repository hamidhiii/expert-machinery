/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.aokman-gearbox.com", pathname: "/d/pic/**" },
      { protocol: "https", hostname: "product.standartpompa.com", pathname: "/AppRepo/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
