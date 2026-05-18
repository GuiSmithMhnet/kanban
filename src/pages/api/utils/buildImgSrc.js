import getCurrentUrl from "@/pages/api/config/getCurrentUrl";

const buildImgSrc = (public_url) => {
    return `${getCurrentUrl().origin}:${process.env.OPERA_PORT}/files/${public_url}`;
};

export default buildImgSrc;