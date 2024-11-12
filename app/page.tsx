import Calendar from './components/Calendar';
import Footer from './components/Footer';
import Header from './components/Header';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto pb-5 px-4">
      <Header />
      <Calendar />
      <Footer />
    </div>
  );
}
