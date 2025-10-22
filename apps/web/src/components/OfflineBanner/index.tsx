import { useOnline } from "../../hooks/useOnline";

const OfflineBanner = () => {
    const { isOnline } = useOnline();
    return <div>{!isOnline && <div>Offline</div>}</div>;
};

export default OfflineBanner;
