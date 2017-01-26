package lt.javainiai.repository;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
public interface RepositoryInterface<T> {

    public T save(T entity);
    
    public T update(Long id, T entity);

    public List<T> findAll();

    public T findById(Long id);

    public void deleteById(Long id);

}
