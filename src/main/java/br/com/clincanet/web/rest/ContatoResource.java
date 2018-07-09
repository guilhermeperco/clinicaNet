package br.com.clincanet.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.clincanet.domain.Contato;
import br.com.clincanet.service.ContatoService;
import br.com.clincanet.web.rest.errors.BadRequestAlertException;
import br.com.clincanet.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Contato.
 */
@RestController
@RequestMapping("/api")
public class ContatoResource {

    private final Logger log = LoggerFactory.getLogger(ContatoResource.class);

    private static final String ENTITY_NAME = "contato";

    private final ContatoService contatoService;

    public ContatoResource(ContatoService contatoService) {
        this.contatoService = contatoService;
    }

    /**
     * POST  /contatoes : Create a new contato.
     *
     * @param contato the contato to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contato, or with status 400 (Bad Request) if the contato has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contatoes")
    @Timed
    public ResponseEntity<Contato> createContato(@RequestBody Contato contato) throws URISyntaxException {
        log.debug("REST request to save Contato : {}", contato);
        if (contato.getId() != null) {
            throw new BadRequestAlertException("A new contato cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Contato result = contatoService.save(contato);
        return ResponseEntity.created(new URI("/api/contatoes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contatoes : Updates an existing contato.
     *
     * @param contato the contato to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contato,
     * or with status 400 (Bad Request) if the contato is not valid,
     * or with status 500 (Internal Server Error) if the contato couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contatoes")
    @Timed
    public ResponseEntity<Contato> updateContato(@RequestBody Contato contato) throws URISyntaxException {
        log.debug("REST request to update Contato : {}", contato);
        if (contato.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Contato result = contatoService.save(contato);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contato.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contatoes : get all the contatoes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contatoes in body
     */
    @GetMapping("/contatoes")
    @Timed
    public List<Contato> getAllContatoes() {
        log.debug("REST request to get all Contatoes");
        return contatoService.findAll();
    }

    /**
     * GET  /contatoes/:id : get the "id" contato.
     *
     * @param id the id of the contato to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contato, or with status 404 (Not Found)
     */
    @GetMapping("/contatoes/{id}")
    @Timed
    public ResponseEntity<Contato> getContato(@PathVariable Long id) {
        log.debug("REST request to get Contato : {}", id);
        Optional<Contato> contato = contatoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(contato);
    }

    /**
     * DELETE  /contatoes/:id : delete the "id" contato.
     *
     * @param id the id of the contato to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contatoes/{id}")
    @Timed
    public ResponseEntity<Void> deleteContato(@PathVariable Long id) {
        log.debug("REST request to delete Contato : {}", id);
        contatoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
