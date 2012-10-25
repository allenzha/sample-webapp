<?php

namespace App\Controller;

use App\Helper\EntityManager;
use App\Entities\Tag as TagEntity;

class TagController extends BaseController{

    public function get($tagId) {
        //$this->requireReadAccess();

        $repo = EntityManager::getInstance()->getRepository('\App\Entities\Tag');
        $page = $repo->findOneBy(array('tagId' => $tagId));

        if ($page != null) {
            return $page->toArray();
        } else {
            throw new \Exception("tag with id '".$tagId."' not found!");
        }

    }

    public function save($page) {
        //try to save

        //TODO: check rights for saving a tag

        $tagEntity = new TagEntity();
        $tagEntity->setFromObject($page);
        $em = EntityManager::getInstance();
        $em->persist($tagEntity);
        $em->flush();

        return $tagEntity->getId();
    }
}
