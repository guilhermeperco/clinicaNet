package br.com.clincanet.service.impl;

import br.com.clincanet.service.ConsultaService;
import br.com.clincanet.domain.Consulta;
import br.com.clincanet.repository.ConsultaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Consulta.
 */
@Service
@Transactional
public class ConsultaServiceImpl implements ConsultaService {

    private final Logger log = LoggerFactory.getLogger(ConsultaServiceImpl.class);

    private final ConsultaRepository consultaRepository;

    public ConsultaServiceImpl(ConsultaRepository consultaRepository) {
        this.consultaRepository = consultaRepository;
    }

    /**
     * Save a consulta.
     *
     * @param consulta the entity to save
     * @return the persisted entity
     */
    @Override
    public Consulta save(Consulta consulta) {
        log.debug("Request to save Consulta : {}", consulta);        return consultaRepository.save(consulta);
    }

    /**
     * Get all the consultas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Consulta> findAll(Pageable pageable) {
        log.debug("Request to get all Consultas");
        return consultaRepository.findAll(pageable);
    }


    /**
     * Get one consulta by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Consulta> findOne(Long id) {
        log.debug("Request to get Consulta : {}", id);
        return consultaRepository.findById(id);
    }

    /**
     * Delete the consulta by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Consulta : {}", id);
        consultaRepository.deleteById(id);
    }
}
