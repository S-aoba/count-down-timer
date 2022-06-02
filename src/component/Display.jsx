const Display = (props) => {
  return (
    <div className="mt-6 flex justify-center">
      <div className="py-3 sm:w-full md:w-3/4 xl:w-6/12 flex justify-center">
        <p className="text-8xl font-thin">{`${props.hours}:${props.minutes}:${props.seconds}`}</p>
        <p></p>
      </div>
    </div>
  );
};

export default Display;
