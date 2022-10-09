<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Form\Extension\Core\Type\TextType; /* TextType::class */

use Symfony\Component\Security\Core\Security;

// Database
use App\Entity\Exercise;
use App\Entity\User;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

// Request
use Symfony\Component\HttpFoundation\Request;

/**
 *
 * Defualt controller class
 */
class DashboardController extends AbstractController
{
    /**
     * @return ('dashboard/index.html.twig')
     */
    #[Route('/dashboard/{id}', name: 'app_dashboard')]
    public function index(Request $request, ManagerRegistry $doctrine, #[CurrentUser] ?User $user, $id): Response
    {
        // create form
        $exercises = new Exercise();
        $form = $this->createFormBuilder($exercises)
            ->add('bench_press', TextType::class, array('label' => 'bench press - weight (kg)', 'attr' => array('style' => 'margin-bottom:12px', )),)
            ->add('bench_press_rep', TextType::class, array('label' => 'times', 'attr' => array('style' => 'margin-bottom:12px',)))
            ->add('deadlift', TextType::class, array('label' => 'dead lift - weight (kg)', 'attr' => array('style' => 'margin-bottom:12px')))
            ->add('deadlift_rep', TextType::class, array('label' => 'times', 'attr' => array('style' => 'margin-bottom:12px')))
            ->add('squat', TextType::class, array('label' => 'squat - weight (kg)', 'attr' => array('style' => 'margin-bottom:12px')))
            ->add('squat_rep', TextType::class, array('label' => 'times', 'attr' => array('style' => 'margin-bottom:12px')))
            ->add('weight', TextType::class, array('label' => 'weight (kg)', 'attr' => array('style' => 'margin-bottom:12px')))
            ->add('height', TextType::class, array('label' => 'height (cm)', 'attr' => array('style' => 'margin-bottom:12px')))
            ->getForm();

        // PSST and validation
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

            $exercises->setDate(new \DateTime());

            // Many to One Relationship => link two tables (user and exercises)
            $exercises->setUser($user);

            $em = $doctrine->getManager();
            $em->persist($exercises);
            $em->persist($user);
            $em->flush();

            return $this->redirectToRoute('app_dashboard', ['id' => $this->getUser()->getUserIdentifier()]);
        }

        # make it possible to use them in html
        # show data for a certain user
        $exercises = $doctrine->getRepository(Exercise::class)->findBy(['User' => $user->getId()]);

        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        return $this->render('dashboard/index.html.twig', [
            'controller_name' => 'DashboardController',
            'form' => $form->createView(), // input form
            'exercises' => $exercises,   // return DB instance so that I can use it in html(+js)
        ]);
    }

    /**
     * Database show the list
     *
     * @param \ManagerRegistry $doctrine
     * @param \MailerInterface $mailer
     *
     * @return ('dashboard/delete.html.twig')
     */
    #[Route('/list', name: 'app_list')]
    public function listAction(Request $request, ManagerRegistry $doctrine, #[CurrentUser] ?User $user)
    {
        $exercises = $doctrine->getRepository(Exercise::class)->findBy(['User' => $user->getId()]);
        // return $this->redirectToRoute('app_fix');
        return $this->render('dashboard/delete.html.twig',[
            'exercises' => $exercises,
        ]);
    }

    /**
     * Database delete list
     *
     * @param \ManagerRegistry $doctrine
     * @param \MailerInterface $mailer
     * @param $id => selected data
     *
     * @return ('app_lsit') => delete.html.twig
     */
    #[Route('/delete/{id}', name: 'app_delete')]
    public function delete(Request $request, ManagerRegistry $doctrine, $id, #[CurrentUser] ?User $user): Response
    {
        $em = $doctrine->getManager();
        $exercise = $em->getRepository(Exercise::class)->find($id);;

        $em->remove($exercise);
        $em->flush();
        //  $todos = $this->getDoctrine()
        // ->getRepository('AppBundle:Todo')
        // ->find($id);

        $this->addFlash(
            'notice',
            'Todo Removed'
        );

        return $this->redirectToRoute('app_list');
    }
}