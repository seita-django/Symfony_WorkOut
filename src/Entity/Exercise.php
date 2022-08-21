<?php

namespace App\Entity;

use App\Repository\ExerciseRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExerciseRepository::class)]
class Exercise
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $bench_press = null;

    #[ORM\Column]
    private ?int $deadlift = null;

    #[ORM\Column]
    private ?int $squat = null;

    #[ORM\Column]
    private ?int $weight = null;

    #[ORM\Column]
    private ?int $height = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column]
    private ?int $bench_press_rep = null;

    #[ORM\Column]
    private ?int $deadlift_rep = null;

    #[ORM\Column]
    private ?int $squat_rep = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBenchPress(): ?int
    {
        return $this->bench_press;
    }

    public function setBenchPress(int $bench_press): self
    {
        $this->bench_press = $bench_press;

        return $this;
    }

    public function getDeadlift(): ?int
    {
        return $this->deadlift;
    }

    public function setDeadlift(int $deadlift): self
    {
        $this->deadlift = $deadlift;

        return $this;
    }

    public function getSquat(): ?int
    {
        return $this->squat;
    }

    public function setSquat(int $squat): self
    {
        $this->squat = $squat;

        return $this;
    }

    public function getWeight(): ?int
    {
        return $this->weight;
    }

    public function setWeight(int $weight): self
    {
        $this->weight = $weight;

        return $this;
    }

    public function getHeight(): ?int
    {
        return $this->height;
    }

    public function setHeight(int $height): self
    {
        $this->height = $height;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getBenchPressRep(): ?int
    {
        return $this->bench_press_rep;
    }

    public function setBenchPressRep(int $bench_press_rep): self
    {
        $this->bench_press_rep = $bench_press_rep;

        return $this;
    }

    public function getDeadliftRep(): ?int
    {
        return $this->deadlift_rep;
    }

    public function setDeadliftRep(int $deadlift_rep): self
    {
        $this->deadlift_rep = $deadlift_rep;

        return $this;
    }

    public function getSquatRep(): ?int
    {
        return $this->squat_rep;
    }

    public function setSquatRep(int $squat_rep): self
    {
        $this->squat_rep = $squat_rep;
        return $this;
    }
}