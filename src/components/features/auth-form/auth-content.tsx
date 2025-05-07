interface ContentProps {
  title: string;
  form: React.ReactNode;
}

const AuthContent = ({ title, form }: ContentProps) => {
  return (
    <div className="mb-[76px] mt-12 w-full justify-items-center px-4 md:mb-[75px] md:mt-[60px] md:px-0">
      <h1 className="justify-start text-center text-xl font-semibold leading-relaxed text-secondary-grey-900">
        {title}
      </h1>
      {form}
    </div>
  );
};

export default AuthContent;
