import { Separator } from "@/components/ui/separator";

interface PageTitleProps {
  title: string;
  subtitle: string;
}

const PageTitle = ({ title, subtitle }: PageTitleProps) => {
  return (
    <div className="text-left mb-32 animate-fadeIn">
      <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">
        {title}
      </h1>
      <Separator className="my-4 w-16 bg-gray-600" />
      <p className="text-gray-400 text-base tracking-widest">
        {subtitle}
      </p>
    </div>
  );
};

export default PageTitle;