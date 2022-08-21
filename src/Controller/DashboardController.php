<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Form\Extension\Core\Type\TextType; /* TextType::class */

// データベース
use App\Entity\Exercise;
// リクエスト
use Symfony\Component\HttpFoundation\Request;

/**
 *
 * デフォルトのControllerクラス
 */
class DashboardController extends AbstractController
{
    /**
     * @return ('dashboard/index.html.twig')
     */
    #[Route('/dashboard', name: 'app_dashboard')]
    public function index(Request $request, ManagerRegistry $doctrine): Response
    {
        // フォームの組立
        $exercises = new Exercise(); // 後で利用したいのでPostインスタンスを変数に入れる
        $form = $this->createFormBuilder($exercises)
            ->add('bench_press', TextType::class, array('label' => 'ベンチプレス - 重量 (kg)', 'attr' => array('style' => 'margin-bottom:12px', )),)
            ->add('bench_press_rep', TextType::class, array('label' => '回数', 'attr' => array('style' => 'margin-bottom:12px',)))
            ->add('deadlift', TextType::class, array('label' => 'デッドリフト - 重量 (kg)', 'attr' => array('style' => 'margin-bottom:12px')))
            ->add('deadlift_rep', TextType::class, array('label' => '回数', 'attr' => array('style' => 'margin-bottom:12px')))
            ->add('squat', TextType::class, array('label' => 'スクワット - 重量 (kg)', 'attr' => array('style' => 'margin-bottom:12px')))
            ->add('squat_rep', TextType::class, array('label' => '回数', 'attr' => array('style' => 'margin-bottom:12px')))
            ->add('weight', TextType::class, array('label' => '体重 (kg)', 'attr' => array('style' => 'margin-bottom:12px')))
            ->add('height', TextType::class, array('label' => '身長 (cm)', 'attr' => array('style' => 'margin-bottom:12px')))
            ->getForm();

        // PSST判定&バリデーション
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // エンティティを永続化
            $exercises->setDate(new \DateTime());

            $em = $doctrine->getManager();

            $em->persist($exercises);
            $em->flush();

            return $this->redirectToRoute('app_dashboard');
        }

        # html内で使用できるようにする
        $exercises = $doctrine->getRepository(Exercise::class)->findAll();

        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        return $this->render('dashboard/index.html.twig', [
            'controller_name' => 'DashboardController',
            'form' => $form->createView(), // DBのフォーム入力
            'exercises' => $exercises,   // html(+js)でデータベースを使用できるようにDBのインスタンスを返しておく
        ]);
    }

    /**
     * データベース リスト表示
     *
     * @param \ManagerRegistry $doctrine
     * @param \MailerInterface $mailer
     *
     * @return ('dashboard/delete.html.twig')
     */
    #[Route('/list', name: 'app_list')]
    public function listAction(Request $request, ManagerRegistry $doctrine)
    {
        $exercises = $doctrine->getRepository(Exercise::class)->findAll();
        // return $this->redirectToRoute('app_fix');
        return $this->render('dashboard/delete.html.twig',[
            'exercises' => $exercises,
        ]);
    }

    /**
     * データベース リスト 削除
     *
     * @param \ManagerRegistry $doctrine
     * @param \MailerInterface $mailer
     * @param $id => 指定のデータベース
     *
     * @return ('app_lsit') => delete.html.twig
     */
    #[Route('/delete/{id}', name: 'app_delete')]
    public function delete(Request $request, ManagerRegistry $doctrine, $id): Response
    {
        $em = $doctrine->getManager();
        $exercise = $em->getRepository(Exercise::class)->find($id);

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
