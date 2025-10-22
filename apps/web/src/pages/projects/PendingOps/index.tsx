import { useFlushOps, usePendingOps } from "../../../api/queries/pendingOps";
import { Button, Card } from "@blade/ui";

const PendingOps = () => {
    const { data } = usePendingOps();
    const { mutate, isPending, isError } = useFlushOps();
    return (
        <>
            {isError && "Error Syncing Changes..."}
            <Button onClick={() => mutate()}>
                {isPending ? "Syncing..." : "Sync"}
            </Button>
            {data?.map((op) => (
                <Card>{op.data?.title}</Card>
            ))}
        </>
    );
};

export default PendingOps;
