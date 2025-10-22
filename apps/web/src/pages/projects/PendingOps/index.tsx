import { usePendingOps } from "../../../api/queries/pendingOps";

const PendingOps = () => {
    const { data } = usePendingOps();

    return (
        <>
            {data?.map((op) => (
                <p>{op.data?.title}</p>
            ))}
        </>
    );
};

export default PendingOps;
