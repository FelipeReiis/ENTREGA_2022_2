import Lab from '../assets/imgs/lab.jpg';
import Tec from '../assets/imgs/tec.jpg'
import End from '../assets/imgs/52108.jpg'
import Carousel from 'react-bootstrap/Carousel';

function Home() {
  return (
    <div>
      <Carousel slide={false}  variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src= {Lab}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Laboratorios especializados</h3>
          <p>Com equipamentos de ultima geração, para melhor aprendizado</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Tec}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Ensino Técnico</h3>
          <p>Aqui você ja sai altamente capacitado para o mercado de trabalho</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={End}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Sobre Nós</h3>
          <p>
            Nós da Maestro, somos uma escola de ensino médio/técnico de extrema qualidade, que visa educar e colocar da melhor forma possivel nossos estudante no mercado de trabalho. Localizados no bairro de bebedouros. <br/>
            CNPJ 2123156456489
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default Home;
