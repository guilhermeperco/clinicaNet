package br.com.clincanet.repository;

import br.com.clincanet.domain.Paciente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Paciente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

}
