import {getProviders, signIn} from "next-auth/react";

function login( {providers}) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen justify-center">
        <img className="w-52 mb-5" src="https://i.imgur.com/fPuEa9V.png" alt="" />
         {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button className="bg-[#18d860] text-white p-5 rounded-full" 
              onClick={ () => signIn(provider.id, {callbackUrl: "/"})}
             >Login with {provider.name} </button> 
            </div>
        ))}
    </div>
  )
}

export default login

export async function getServerSideProps() {
  const providers = await getProviders();
  
  return{
    props: {
      providers,
    }
  }
}