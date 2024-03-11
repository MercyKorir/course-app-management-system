<?php

namespace Tests\App\Models;

use CodeIgniter\Test\CIUnitTestCase;
use App\Models\MediaModel;

class MediaModelTest extends CIUnitTestCase
{
    protected $seed = 'MediaSeeder';
    protected $refresh = true;
    protected $model;

    public function setUp(): void
    {
        parent::setUp();
        $this->model = new MediaModel();
    }

    public function testInsertMedia()
    {
        $data = [
            'media_name' => 'courseIcon.png',
            'media_type' => 'image/png',
            'media_path' => '../assets/uploads/media/courseIcon.png',
        ];

        $this->model->save($data);
        $insertedMedia = $this->model->where('media_name', $data['media_name'])->first();

        $this->assertIsArray($insertedMedia);
        $this->assertArrayHasKey('media_id', $insertedMedia);
        $this->assertEquals($data['media_name'], $insertedMedia['media_name']);
        $this->assertEquals($data['media_type'], $insertedMedia['media_type']);
        $this->assertEquals($data['media_path'], $insertedMedia['media_path']);
    }

    public function testUpdateMedia()
    {
        $media = $this->model->findAll()[0];
        $media['media_name'] = 'updatedIcon.png';

        $this->model->save($media);
        $updatedMedia = $this->model->find($media['media_id']);

        $this->assertEquals('updatedIcon.png', $updatedMedia['media_name']);
    }

    public function testDeleteMedia()
    {
        $media = $this->model->findAll()[0];
        $this->model->delete($media['media_id']);

        $deletedMedia = $this->model->find($media['media_id']);
        $this->assertNull($deletedMedia);
    }
}
