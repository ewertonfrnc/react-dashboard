function Spinner() {
  return (
    <div
      className="mx-auto my-[4.8rem] h-16 w-16 animate-spin rounded-full"
      style={{
        background: `radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000) top/10px 10px no-repeat, conic-gradient(#0000 30%, var(--color-brand-600))`,
        WebkitMask: `radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)`,
        mask: `radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)`,
        animationDuration: '1.5s',
      }}
    />
  );
}

export default Spinner;
