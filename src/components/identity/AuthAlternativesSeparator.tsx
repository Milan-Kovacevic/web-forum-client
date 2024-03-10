export default function AuthAlternativesSeparator() {
  return (
    <div className="flex flex-row w-full gap-1 items-center">
      <span className="w-full border-t flex-1" />
      <div className="relative flex justify-center text-xs uppercase">
        <span className="!bg-clip-text bg-background font-semibold px-2 text-accent-foreground">
          Or continue with
        </span>
      </div>
      <span className="w-full border-t flex-1" />
    </div>
  );
}
