import React from 'react'
import './home.css'
import HeroSectionHome from '../../compontes/heroSectionHom/HeroSectionHome'
import HeadingSection from '../../compontes/headingSection/HeadingSection'
import HedingParti from '../../compontes/hedingParti/HedingParti'

const Home = () => {
  return (
    <section className='homePage bg-white'>
      <HeroSectionHome />
      <div className='container-md'>
        <HeadingSection titre={"Avez-vous un travail que vous souhaitez réaliser ?"} />
        <div className='containers-lefth d-flex justify-content-between'>
          <div>

            <HedingParti titre={"Ajouter un projet"} paragraphe={`Ajoutez les détails du projet que vous devez réaliser 
        et les compétences requises et recevez des offres
       de pigistes spécialisés en quelques minutes.`} />
            <HedingParti titre={"Choisissez le bon freelance"} paragraphe={`Comparez les offres des freelances, parcourez leurs dossiers, 
        avis et travaux, négociez avec eux via des messages et choisissez
       le meilleur pour mettre en œuvre votre projet`} />
            <HedingParti titre={"Recevez le projet"} paragraphe={`Le freelance que vous choisirez travaillera sur votre projet 
        et effectuera un suivi avec vous jusqu'à ce que vous obteniez 
        les résultats de travail convenus et livriez le projet.`} />
          </div>

          <div className='rigth'>

          </div>
        </div>

        <HeadingSection titre={"Comment un freelance vous aide à faire votre travail"} />
        <div className='containers-lefth d-flex justify-content-between'>
          <div>

            <HedingParti titre={"Faites votre travail rapidement et facilement"} paragraphe={`Publiez votre projet et confiez le soin de le mettre 
            en œuvre aux meilleurs freelances professionnels`} />
            <HedingParti titre={"Garantissez vos droits"} paragraphe={`Payez les travaux requis via des méthodes de paiement sécurisées avec la pleine garantie de vos droits financiers`} />
            <HedingParti titre={"Recevez le projet"} paragraphe={`Protégez pleinement vos droits, car le site Indépendant agit 
            comme intermédiaire entre vous et le freelancet.`} />
          </div>

          <div className='rigth'>

          </div>
        </div>
        <div className='rigth'>

          </div>
      </div>
    </section>
  )
}

export default Home