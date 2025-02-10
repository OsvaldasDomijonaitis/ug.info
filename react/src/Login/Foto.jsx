function Foto() {
  return (
    <div className="w-1/2 h-screen hidden lg:block">
      <img
        src="https://placehold.co/800x/667fff/ffffff.png?text=Nuotrauka&font=Montserrat"
        alt="Placeholder Image"
        className="object-cover w-full h-full"
      />
    </div>
  );
}

Foto.propTypes = {};

export default Foto;
