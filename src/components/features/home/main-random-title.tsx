const TitleSection = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-[12px] self-stretch lg:gap-[22px]">
      <strong className="h-[25px] justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900 lg:h-[28px]">
        오늘의 랜덤 미션
      </strong>
      <p className="hidden h-[60px] items-center self-stretch text-sm leading-tight text-secondary-grey-900 lg:flex">
        혼자서 보내는 시간이 지루하게 느껴질 때, <br />
        다양한 주제의 랜덤 미션을 통해 <br />
        매일 색다른 하루를 만들어보세요.
      </p>
      <p className="flex h-[80px] items-center self-stretch text-sm leading-tight text-secondary-grey-900 lg:hidden">
        혼자서 보내는 시간이 지루하게 <br />
        느껴질 때, 다양한 주제의 랜덤 <br /> 미션을 통해 매일 색다른 하루를 <br />
        만들어보세요.
      </p>
    </div>
  );
};

export default TitleSection;
