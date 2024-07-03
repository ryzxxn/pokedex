import Hero from "./components/hero";
import PokemonList from "./components/pokemon_list";
import Search from "./components/search";

export default function Home() {
  return (
    <>
    <div style={{scrollBehavior:'smooth', height: '100%'}}>
      <div style={{zIndex: '10'}}>
        <Hero/>
      </div>
      <div id="secondpart" style={{minHeight: '100vh'}}>
        <Search/>
        <PokemonList/>
      </div>
    </div>
    </>
  );
}
