import CheatsheetForm from './components/cheatsheet_form';
import NavBar from './components/navbar';

export default function Home() {
  return <div>
    <NavBar />

    <div className='flex justify-center items-center pt-12 lg:pt-36'>
      <CheatsheetForm />
    </div>
  </div>
}
