import React, { useContext } from 'react'
import './home.css'
import HeroSectionHome from '../../compontes/heroSectionHom/HeroSectionHome'
import HeadingSection from '../../compontes/headingSection/HeadingSection'
import HedingParti from '../../compontes/hedingParti/HedingParti'
import Button from '../../compontes/button/Button'
import { UserContext } from '../../context/ContextProvider'

const Home = () => {
  

  const { utilisateur , setutilisateur , Token , isToken , isLogin} = useContext(UserContext);

  
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

          </div>

        </div>
        <HeadingSection titre={"Choose Different Category "} />

        <div className='d-flex justify-content-center align-items-center'>
          <Button name='More Categories'></Button>
        </div>

        <HeadingSection titre={"Checkout The Best Portfolios Here"} />

      </div>
    </section>
  )
}

export default Home