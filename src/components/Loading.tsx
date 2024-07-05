import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="h-screen flex w-full top-0 left-0 items-center absolute justify-center bg-white/90 z-[100]">
      <ReactLoading
        type="spinningBubbles"
        color="#7963EC"
        height={50}
        width={50}
      />
    </div>
  );
}
