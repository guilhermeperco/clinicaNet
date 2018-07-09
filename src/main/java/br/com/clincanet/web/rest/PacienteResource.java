package br.com.clincanet.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.clincanet.domain.Paciente;
import br.com.clincanet.service.PacienteService;
import br.com.clincanet.web.rest.errors.BadRequestAlertException;
import br.com.clincanet.web.rest.util.HeaderUtil;
import br.com.clincanet.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Paciente.
 */
@RestController
@RequestMapping("/api")
public class PacienteResource {

    private final Logger log = LoggerFactory.getLogger(PacienteResource.class);

    private static final String ENTITY_NAME = "paciente";

    private final PacienteService pacienteService;

    public PacienteResource(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    /**
     * POST  /pacientes : Create a new paciente.
     *
     * @param paciente the paciente to create
     * @return the ResponseEntity with status 201 (Created) and with body the new paciente, or with status 400 (Bad Request) if the paciente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pacientes")
    @Timed
    public ResponseEntity<Paciente> createPaciente(@RequestBody Paciente paciente) throws URISyntaxException {
        log.debug("REST request to save Paciente : {}", paciente);
        if (paciente.getId() != null) {
            throw new BadRequestAlertException("A new paciente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Paciente result = pacienteService.save(paciente);
        return ResponseEntity.created(new URI("/api/pacientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pacientes : Updates an existing paciente.
     *
     * @param paciente the paciente to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated paciente,
     * or with status 400 (Bad Request) if the paciente is not valid,
     * or with status 500 (Internal Server Error) if the paciente couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pacientes")
    @Timed
    public ResponseEntity<Paciente> updatePaciente(@RequestBody Paciente paciente) throws URISyntaxException {
        log.debug("REST request to update Paciente : {}", paciente);
        if (paciente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Paciente result = pacienteService.save(paciente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, paciente.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pacientes : get all the pacientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of pacientes in body
     */
    @GetMapping("/pacientes")
    @Timed
    public ResponseEntity<List<Paciente>> getAllPacientes(Pageable pageable) {
        log.debug("REST request to get a page of Pacientes");
        Page<Paciente> page = pacienteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/pacientes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /pacientes/:id : get the "id" paciente.
     *
     * @param id the id of the paciente to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the paciente, or with status 404 (Not Found)
     */
    @GetMapping("/pacientes/{id}")
    @Timed
    public ResponseEntity<Paciente> getPaciente(@PathVariable Long id) {
        log.debug("REST request to get Paciente : {}", id);
        Optional<Paciente> paciente = pacienteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(paciente);
    }

    /**
     * DELETE  /pacientes/:id : delete the "id" paciente.
     *
     * @param id the id of the paciente to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pacientes/{id}")
    @Timed
    public ResponseEntity<Void> deletePaciente(@PathVariable Long id) {
        log.debug("REST request to delete Paciente : {}", id);
        pacienteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
