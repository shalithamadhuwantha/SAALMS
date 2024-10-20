import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public", 
  register: true, 
  skipWaiting: true, 
});

export default withPWA({
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
});