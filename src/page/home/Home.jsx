import React, { useContext } from 'react'
import './home.css'
import HeroSectionHome from '../../compontes/heroSectionHom/HeroSectionHome'
import HeadingSection from '../../compontes/headingSection/HeadingSection'
import HedingParti from '../../compontes/hedingParti/HedingParti'
import Button from '../../compontes/button/Button'
import { UserContext } from '../../context/ContextProvider'

const Home = () => {


  const { utilisateur, setutilisateur, Token, isToken, isLogin } = useContext(UserContext);


  return (
    <section className='homePage bg-white'>
      <h1>{Token}</h1>
      <HeroSectionHome />
      <div className='container-md'>
        <HeadingSection titre={"Avez-vous un travail que vous souhaitez réaliser ?"} />
        <div className='containers-lefth d-flex justify-content-between'>
          <div>

            <HedingParti is_Valid={1} titre={"Ajouter un projet"} paragraphe={`Ajoutez les détails du projet que vous devez réaliser 
        et les compétences requises et recevez des offres
       de pigistes spécialisés en quelques minutes.`} />
            <HedingParti is_Valid={1} titre={"Choisissez le bon freelance"} paragraphe={`Comparez les offres des freelances, parcourez leurs dossiers, 
        avis et travaux, négociez avec eux via des messages et choisissez
       le meilleur pour mettre en œuvre votre projet`} />
            <HedingParti is_Valid={1} titre={"Recevez le projet"} paragraphe={`Le freelance que vous choisirez travaillera sur votre projet 
        et effectuera un suivi avec vous jusqu'à ce que vous obteniez 
        les résultats de travail convenus et livriez le projet.`} />
          </div>

          <div className='rigth'>
            <img src={require('./img (1).png')} />
          </div>
        </div>

        <HeadingSection titre={"Comment un freelance vous aide à faire votre travail"} />
        <div className='containers-lefth d-flex justify-content-between'>
          <div>

            <HedingParti is_Valid={0} titre={"Faites votre travail rapidement et facilement"} paragraphe={`Publiez votre projet et confiez le soin de le mettre 
            en œuvre aux meilleurs freelances professionnels`} />
            <HedingParti is_Valid={0} titre={"Garantissez vos droits"} paragraphe={`Payez les travaux requis via des méthodes de paiement sécurisées avec la pleine garantie de vos droits financiers`} />
            <HedingParti is_Valid={0} titre={"Recevez le projet"} paragraphe={`Protégez pleinement vos droits, car le site Indépendant agit 
            comme intermédiaire entre vous et le freelancet.`} />
          </div>

          <div className='rigth'>
            <img src={require('./img (2).png')} />
          </div>

        </div>
        <HeadingSection titre={"Choose Different Category "} />



        <div class="container ">
          <div class="row">
            <div class="col-md-4 mb-5" >
              <div class="card s">
                <img src={require('./frontEnd.png')}   class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Front End</h5>
                  <p class="card-text">Frontend fait référence à la partie visible et interactive d'un site Web ou d'une application. Il est développé en utilisant des langages Web tels que HTML, CSS et JavaScript, et gère tout ce que l'utilisateur voit et interagit avec.</p>

                </div>
              </div>
            </div>

            <div class="col-md-4 mb-5">
              <div class="card s">
                <img src={require('./backEnd.png')} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Back End</h5>
                  <p class="card-text">Backend fait référence à la partie invisible d'un site Web ou d'une application, qui gère les aspects techniques tels que les bases de données, le traitement des données et la logique de l'application. Il est souvent développé en utilisant des langages tels que Python, Ruby, PHP, Java, etc.</p>

                </div>
              </div>
            </div>

            <div class="col-md-4 mb-5">
              <div class="card s">
                <img src={require("./fullStack.png")} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Full Stack</h5>
                  <p class="card-text">Full Stack fait référence à la capacité de développer à la fois le Frontend et le Backend d'une application. Un développeur Full Stack est capable de travailler sur tous les aspects d'une application, de la conception de l'interface utilisateur à la gestion des serveurs et des bases de données.</p>

                </div>
              </div>
            </div>

          </div>
        </div>


        <div  style={{ minHeight: "20vh" }}>
          {/* <Button name='More Categories'></Button> */}
        </div>
        {/* <HeadingSection titre={"Checkout The Best Portfolios Here"} /> */}

      </div>
    </section>
  )
}

export default Home