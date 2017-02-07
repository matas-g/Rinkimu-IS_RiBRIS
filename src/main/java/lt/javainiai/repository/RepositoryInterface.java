package lt.javainiai.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
public interface RepositoryInterface<T> {

    public T saveOrUpdate(T entity);

    public List<T> findAll();

    public T findById(Long id);

    public void deleteById(Long id);

}
