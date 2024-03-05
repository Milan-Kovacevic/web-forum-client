type AuthFormHeaderProps = {
  title: string;
  subtitle: string;
};

export default function AuthFormHeader(props: AuthFormHeaderProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center mb-5">
      <h1 className="sm:text-4xl text-3xl font-bold text-center tracking-tighter text-gradient !bg-clip-text text-transparent !bg-cover !bg-center">
        {props.title}
      </h1>
      <p className="text-center text-xs sm:text-sm text-muted-foreground">
        {props.subtitle}
      </p>
    </div>
  );
}
