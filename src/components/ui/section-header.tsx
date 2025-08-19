interface SectionHeaderProps {
  title: string;
  color?: string;
}

export default function SectionHeader({
  title,
  color = "#e5e5e5",
}: SectionHeaderProps) {
  const dynamicStyles = {
    color: color,
  };
  return (
    <div className="w-full flex justify-center items-center">
      <h1
        className={`md:text-[200px] lg:text-[300px] xl:text-[380px]  text-[100px] font-antic`}
        style={dynamicStyles}
      >
        {title}
      </h1>
    </div>
  );
}
