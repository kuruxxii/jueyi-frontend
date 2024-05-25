type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen max-w-[1522px] mx-4 2xl:mx-auto mt-4 2xl:px-4">
      {children}
    </div>
  );
};

export default Container;
