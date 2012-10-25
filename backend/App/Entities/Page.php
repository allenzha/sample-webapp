<?php


namespace App\Entities;

use App\Entities\StandardEntity;

/**
 * @Entity @Table(name="pages")
 **/
class Page extends StandardEntity
{
    /**
     * @Id @Column(type="bigint")
     * @GeneratedValue
     * @var int
     **/
    protected $pageId;


    /**
     * @ManyToMany(targetEntity="Tag", inversedBy="items")
     * @JoinTable(name="items_tags",
     *  joinColumns={@JoinColumn(name="pageId", referencedColumnName="pageId")},
     *  inverseJoinColumns={@joinColumn(name="tagId", referencedColumnName="tagId")}
     * )
     *
     */
    protected $tags;

    /**
     * @Column(type="string")
     * @var string
     **/
    protected $title;

    /**
     * @Column(type="text")
     * @var string
     */
    protected $description;


    /**
     * @Column(type="text")
     * @var string
     */
    protected $url;


    public function getId() {
        return $this->pageId;
    }

    public function setFromObject($object) {

        //TODO: - fetch only attributes which are set in $object
        //TODO: - check type of $object
        //TODO: - validate!
        $this->title = $object->title;
        $this->description = $object->description;
        $this->url = "test";
//        $this->url = $object->url;
    }

}
