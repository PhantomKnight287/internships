import useHydrate from "../hooks/hydrate";

function RootRoute() {
  useHydrate({ redirectIfNoToken: true });
  return (
    <div className="text-blue-500">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero est vel
      quas quidem distinctio hic alias sit fuga porro ratione.
    </div>
  );
}

export default RootRoute;
