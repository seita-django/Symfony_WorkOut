<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220831125652 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE record (id INT AUTO_INCREMENT NOT NULL, bench_press INT NOT NULL, bench_press_rep INT NOT NULL, deadlift INT NOT NULL, deadlift_rep INT NOT NULL, squat INT NOT NULL, squat_rep INT NOT NULL, weight INT NOT NULL, height INT NOT NULL, date DATE NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE exercise ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE exercise ADD CONSTRAINT FK_AEDAD51CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_AEDAD51CA76ED395 ON exercise (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE record');
        $this->addSql('ALTER TABLE exercise DROP FOREIGN KEY FK_AEDAD51CA76ED395');
        $this->addSql('DROP INDEX IDX_AEDAD51CA76ED395 ON exercise');
        $this->addSql('ALTER TABLE exercise DROP user_id');
    }
}
