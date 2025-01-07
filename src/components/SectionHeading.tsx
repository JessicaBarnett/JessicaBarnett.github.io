type SectionHeadingProps = {
  children: React.ReactNode,
  className?: string
};

function SectionHeading({children, className = ''}: SectionHeadingProps) {
  return (
    <h3 className={`title-2 section-heading ${className}`}>{children}</h3>
  )
}

export default SectionHeading;
