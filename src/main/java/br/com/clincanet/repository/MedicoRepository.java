package br.com.clincanet.repository;

import br.com.clincanet.domain.Medico;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Medico entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {

}
