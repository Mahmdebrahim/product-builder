interface IProps {
    ImgUrl: string,
    alt: string,
    ClassName: string,
}
const Image = ({ImgUrl, alt, ClassName}:IProps) => {
    return <img src={ImgUrl} alt={alt} className={ClassName} />;
}
export default Image;