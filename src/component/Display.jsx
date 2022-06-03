const Display = (props) => {
  return (
    <div className="mt-6 flex justify-center">
      <div className="py-3 sm:w-full md:w-3/4 xl:w-6/12 flex justify-center">
        <p className="text-8xl font-thin">
          {props.hours}
          <span className="text-4xl mx-8">時間</span>
          {props.minutes}
          <span className="text-4xl mx-8">分</span>
          {props.seconds}
          <span className="text-4xl mx-8">秒</span>
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default Display;
