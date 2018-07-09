package br.com.clincanet.repository;

import br.com.clincanet.domain.Contato;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Contato entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContatoRepository extends JpaRepository<Contato, Long> {

}
