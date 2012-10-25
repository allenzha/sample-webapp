<?php

namespace App\Controller;

use App\Helper\EntityManager;
use App\Entities\Page as PageEntity;

class PageController extends BaseController{

    public function get($pageId, $isPreview = false) {
//        $this->requireReadAccess();

        $repo = EntityManager::getInstance()->getRepository('\App\Entities\Page');
        $page = $repo->findOneBy(array('pageId' => $pageId));

        if ($page != null) {
            return $page->toArray();
        } else {
            throw new \Exception("page with id '".$pageId."' not found!");
        }

    }


    public function getList($start, $limit) {
        $pages = EntityManager::getInstance()
                ->createQuery("SELECT p FROM App\Entities\Page p")
                ->setFirstResult($start)
                ->setMaxResults($limit)
                ->getResult();

        $result = array();

        foreach($pages as $page) {
            $result[] = $page->toArray();
        }

        return $result;
    }

    public function save($page) {
        //try to save

        //TODO: check rights for saving a page


        $pageEntity = new PageEntity();
        $pageEntity->setFromObject($page);
        $em = EntityManager::getInstance();
        $em->persist($pageEntity);
        $em->flush();

        return $pageEntity->getId();
    }
}
